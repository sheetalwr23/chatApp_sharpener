const Group = require("../models/group");
const GroupMembers = require("../models/group_members");
const User = require("../models/user");

const createGroup = async (req, res) => {
  try {
    const groupName = req.body.groupName;
    const id = req.user.id;
    const members = req.body.members;

    const group = await Group.create({
      groupname: groupName,
      createdBy: id,
      userId: req.user.id,
    });
    console.log("group>>>>>>>>>>>>>>>>>>>>", group);
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

const updateGroup = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const members = req.body.members;

    const group = await Group.update(
      { groupname: req.body.groupName },
      { where: { id } }
    );
    await GroupMembers.destroy({ where: { groupId: id } });

    // here we are using the map function to convert an array of members (user IDs) into an array of objects, where each object represents a group-user association.
    const groupMemberData = members.map((userId) => ({
      groupId: id,
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

const getGroupDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);
    // const userRole = determineUserRole(userId);
    const GroupMem = await GroupMembers.findAll({
      where: { userId },
    });
    // console.log("Group mem:>>>>>>>>>>>>>>>>>>>", GroupMem);

    const finalGroupMemMapping = [];
    // [{groupId:1,userId:2},
    // {groupId:1,userId:3}]
    GroupMem.forEach(async (element, index) => {
      const groups = await Group.findOne({
        where: { id: element.groupId },
      });
      const members = await GroupMembers.findAll({
        where: { groupId: element.groupId },
        include: [
          {
            model: User,
          },
        ],
      });
      finalGroupMemMapping.push({ ...groups.dataValues, members: members });
      if (index === GroupMem.length - 1) {
        return res
          .status(200)
          .json({ finalGroupMemMapping: finalGroupMemMapping });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Can't get group details from the database", error });
  }
};

module.exports = { createGroup, getGroupDetails, updateGroup };
