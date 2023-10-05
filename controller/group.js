const Group = require("../models/group");
const GroupMembers = require("../models/group_members");

const getGroupDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const GroupMem = await GroupMembers.findAll({
      where: { userId },
    });
    // console.log("Group mem:>>>>>>>>>>>>>>>>>>>", GroupMem);

    const groupIDs = GroupMem.map((GroupMember) => GroupMember.groupId);

    console.log("groupIDs>>>>>>>>>>>>>", groupIDs);
    const groups = await Group.findAll({
      where: { Id: groupIDs },
    });
    // console.log("all groups", groups);
    return res
      .status(200)
      .json({ allGroupData: groups, groupmembers: GroupMem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Can't get group details from the database", error });
  }
};

const createGroup = async (req, res) => {
  try {
    const groupName = req.body.groupName;
    const name = req.user.name;
    const members = req.body.members;

    const group = await Group.create({
      groupname: groupName,
      createdBy: name,
      userId: req.user.id,
    });
    const groupID = group.get("id");
    console.log("groupID>>>>>>>>>>>>>>>>>>", groupID);
    // here we are using the map function to convert an array of members (user IDs) into an array of objects, where each object represents a group-user association.
    const groupMemberData = members.map((userId) => ({
      groupId: groupID,
      userId: userId,
    }));
    //  bulkCreate is used for inserting multiple records into the database table in a single operation.
    const groupdta = await GroupMembers.bulkCreate(groupMemberData);
    return res
      .status(200)
      .json({ groupdetails: group, groupMemberData: groupdta });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "cant send group data into db", err });
  }
};

module.exports = { createGroup, getGroupDetails };
