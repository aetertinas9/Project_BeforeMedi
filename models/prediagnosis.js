
module.exports = function(sequelize, Sequelize) {

	var prediagnosis = sequelize.define('prediagnosis', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		uid: {type: Sequelize.INTEGER, notEmpty:true},
		systoleBloodPressure: { type: Sequelize.STRING,notEmpty: true},
		diastoleBloodPressure: { type: Sequelize.STRING,notEmpty: true},
		bloodGlucose: { type: Sequelize.STRING,notEmpty: true},
    pregnant: {type: Sequelize.ENUM('true','false'),defaultValue:'false' },
		takemedicine: {type: Sequelize.ENUM('true','false'),defaultValue:'false' }
});

	return prediagnosis;

}
