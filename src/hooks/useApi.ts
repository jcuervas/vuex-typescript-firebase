import useFirebase from './useFirebase'
import useWebService from './useWebService'

type DataSource = 'firebase' | 'webService'

const endPoints = {
  dataUrl: 'data',
}

function useApi () {
  const dataSource: DataSource = process.env.DATA_SOURCE as DataSource || 'firebase'

  function getData<T> (id: string | number): Promise<T> {
    switch (dataSource) {
      case 'firebase': {
        return useFirebase.get<T>(`${endPoints.dataUrl}/${id}`)
      }
      case 'webService': {
        return useWebService.get<T>(`/${endPoints.dataUrl}`, { params: { id } })
      }
    }
  }

  function recoverPassword (email: string): Promise<any> {
    return useFirebase.recoverPassword(email)
  }

  return {
    recoverPassword,
    getData
  }
}

export default useApi()
