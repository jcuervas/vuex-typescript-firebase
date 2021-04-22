function useUtils () {
  function validateEmail (email: string) {
    // const emailRegex = /.+@+\..+/
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(String(email).toLowerCase())
  }

  function validateUrl (url: string) {
    const urlRegex = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[/\d\w.-]*)*(.+)*/
    return urlRegex.test(url)
  }

  return {
    validateEmail,
    validateUrl
  }
}

export default useUtils()
