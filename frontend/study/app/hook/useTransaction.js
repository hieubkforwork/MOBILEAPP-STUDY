import {useState,useCallback} from 'react'
import {Alert} from 'react-native'
const API_URL = "http://10.0.2.2:5001/api" 

export const useTransaction = (userid) => {
  const [trans, setTrans] = useState([])
  const [summary,setSummary] = useState ({
    total: 0 ,
    income: 0,
    outcome: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchTrans = useCallback(
    async () =>{
      try {
        console.log(`${API_URL}/transactions/${userid}`)
        const response = await fetch(`${API_URL}/transactions/${userid}`)
        const data = await response.json()
        setTrans(data)
      } catch (error) {
        console.log("Transition fetch error",error)

      }
    }
    ,[userid])

  const fetchSummary = useCallback(
    async () =>{
      try {
        const response = await fetch(`${API_URL}/transactions/summary/${userid}`)
        const data = await response.json()
        setSummary(data)
      } catch (error) {
        console.log("Transition fetch error")
      }
    }
    ,[userid])

  const loadData = useCallback(
    async () => {
      if(!userid) return;
      setIsLoading(true)
      try {
        await Promise.all([fetchTrans(),fetchSummary()])
      } catch (error) {
        console.log("Promise error")
      } finally{
        setIsLoading(false)
      }
    },
    [fetchSummary,fetchTrans,userid]
  )
  const delTrans = useCallback(
    async () => {
      try {
        const response = await fetch(`${API_URL}/transactions/${userid}`,{method:'DELETE'})
        if(!response.ok) throw new Error("Delete Failed")
          loadData()
        Alert.alert("Success","Delete Successfully")
      } catch (error) {
        console.log(error)
        Alert.alert("Error",error.message)
      }
    }
  )
  return{trans,summary,isLoading,loadData,delTrans}
}
