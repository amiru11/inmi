module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Mailing',
        {
            email: {
                type: DataTypes.STRING(30),
                unique: true
            }
        },
        {
            timestamps: true
        }
    )
}
  