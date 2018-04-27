module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Person',
        {
            deptCd: {
                type: DataTypes.STRING(10)
            },
            empNm: {
                type: DataTypes.STRING(30)
            },
            engNm: {
                type: DataTypes.STRING(30)
            },
            hjNm: {
                type: DataTypes.STRING(30)
            },
            jpgLink: {
                type: DataTypes.STRING
            },
            origNm: {
                type: DataTypes.STRING(30)
            },
            reeleGbnNm: {
                type: DataTypes.STRING(10)
            }
        },
        {
            timestamps: false
        }
    )
}
  