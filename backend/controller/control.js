import { sql } from "../config/db.js"

const initDB = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initializing DB", error);
    process.exit(1); 
  }
}

const controlPost = async (req,res) => 
{
  try {
      const {title, amount, category,user_id} = req.body
  
      if(!title || !amount || !category || !user_id == undefined){
        return res.status(400).json({message: "All fields are required"});
      }
      const transactions=await sql `
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category} )
      RETURNING *
      `
      res.status(201).json(transactions[0]);
      
    } catch (error) {
      console.log("Error creating the transactions", error)
      res.status(500).json({message:"Internal server error"})
    }
}

const controlGet = async (req,res) => 
{
   try {
      const {user_id} = req.params
      const transactions = await sql `
      SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC
      `
      res.status(200).json(transactions);
  
    } catch (error) {
       console.log("Error getting the transactions", error)
      res.status(500).json({message:"Internal server error"})
    }
}

const controlDelete = async (req,res) => 
{
  try {
  const {idnum} = req.params
    const result = await sql `
    DELETE FROM transactions WHERE id = ${idnum} RETURNING *
    `
  if(result.length == 0) return res.status(404).json({message:"Transaction not found"})
  res.status(200).json(result);

  } catch (error) {
   console.log("Error deleting the transactions", error)
    res.status(500).json({message:"Internal server error"})
}
}

const controlHome = async (req,res) => 
{
  res.send("Home")
}

const controlSummary = async (req,res) =>
{
  try {
    const {idnum} = req.params

    const total = await sql `
        SELECT COALESCE(SUM(amount),0) as total
        FROM transactions 
        WHERE user_id = ${idnum}
    `
    const income = await sql `
        SELECT COALESCE(SUM(amount),0) as income
        FROM transactions
        WHERE user_id = ${idnum} AND amount > 0
    `
    const outcome = await sql `
        SELECT COALESCE(SUM(amount),0) as outcome
        FROM transactions
        WHERE user_id = ${idnum} AND amount < 0
    `
  res.status(200).json({
    "balance": total[0].total,
    "income" : income[0].income,
    "outcome": outcome[0].outcome
  })
  } catch (error) {
    console.log("Error getting the summary", error)
    res.status(500).json({message:"Internal server error"})
  }
}

export {controlPost,controlDelete,controlGet,controlHome,controlSummary,initDB}