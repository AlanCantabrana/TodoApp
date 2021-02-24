const {pool} = require('../config/pgconfig');

const findIdTask = (req, res, next) => {
    let idTask = parseInt(req.params.id);
    pool.query(`SELECT * FROM todo As td WHERE td.todo_id=$1`,[idTask],(err, result)=> {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(result.rowCount === 0) {
            return res.status(404).json({
                ok: false,
                err: {message:'Tarea no encontrada.'} 
            });
        }
        req.idTask = result.rows[0];
        next();
    });
}

module.exports = findIdTask;