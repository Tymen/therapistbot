module.exports = (sequelize, DataTypes) => {
    const safeChatUserModel = sequelize.define("safeChatUserModel", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        dc_UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dc_channelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dc_staffUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    return safeChatUserModel;
}