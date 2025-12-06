import express from "express";



const app = express();
app.use(express.json());

import type codeboxRequest from "./interface/codeboxRequest.interface.ts";
import auth from "./middleware/auth.ts";



app.get("/", (req, res) => {
    res.send("Hello World!");
});


function create_job(task_id: string, code: string, code_language: string, input: string) {
    
   // push messsage to queue
   // create a job 

}

function setJobInCache(task_id: string, status: number) {
 
     // update data in redis cache 
}

fucntion getJobFromDynamoDB(task_id: string) {

    // fetching job from  dynamo db 
}


app.post("/exec", auth, (req, res) => {
  
    /*
     attributes [we are creating here backend connected to message queue and dynamo db [user info not need just task id]]

    */
    const { task_id:string, code:string, code_language:string, input:string } = req.body;

    // now we have to write message to message queue 
    if(!task_id || !code || !code_language)
    {
        return res.status(400).json({ message: "Bad Request" });
    }

    const job =  create_job(task_id, code, code_language, input);    

    // now update the job id in quick cache
    // number will be better
    // 0 means submited 
    // 1 means pending 
    // 2 means completed remove from cache after some time 

    setJobInCache(task_id,-1);
    
    return res.status(200).json({ message: "Job created" });
});


app.get("/pool", auth, (req, res) => {
  
   const {task_id:string } = req.query;

   // now check job status if job is done return result
   
   const jobStatus = checkredis(task_id);
   if(jobStatus == -1)
   {
    return res.status(200).json({ message: "Job not found" });
   }
   if(jobStatus==0)
   {
    return res.status(200).json({ message: "Job submitted" });
   }
   if(jobStatus == 1)
   {
    return res.status(200).json({ message: "Job pending" });
   }
   if(jobStatus == 2)
   {
      // job has been completed 
      // so we neeed to fetch job from dynamo db
      const {output,stderr,err} = getJobFromDynamoDB(task_id);

      const response = {
        output,
        stderr,
        err
      }
      return res.status(200).json(response);

      }
      
   }
   
)






app.listen(3000, () => {
    console.log("Server started on port 3000");
});
