module.exports = (sequelize, DataTypes) => {
    const safeChatUserModel = sequelize.define("safeChatUserModel", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        dc_UserId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dc_channelId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dc_staffUserId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return safeChatUserModel;
}