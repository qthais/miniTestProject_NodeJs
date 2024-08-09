const ListModel=require('../models/ToDoList')
class ListController{
    async show(req,res,next){
        try{
            let data= await ListModel.find({})
            res.json(data)
          }
          catch(err){
            next(err)
          }
    }
    async add(req,res,next){
      try{
        let data=req.body
        const task=new ListModel(data)
        await task.save()
        res.json(task)
      }catch(err){
        next(err)
      }
    }
    async delete(req,res,next){
      try{
        let id=req.params.id
        await ListModel.findByIdAndDelete(id)
        res.json({ message: 'Task deleted successfully' });
      }
      catch(err){
        next(err)
      }
    }
    async update(req,res,next){
      try{
        let id=req.params.id
        const updatedTask=await ListModel.findByIdAndUpdate(id,req.body)
        if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(updatedTask);
      } catch(err){
        next(err)
      }
    }
}
module.exports=new ListController()