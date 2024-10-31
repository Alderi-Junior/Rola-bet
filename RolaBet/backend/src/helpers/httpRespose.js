export const ok = (body) => {
    return{
        succsess: true,
        statusCode: 200,
        body
    }

}

export const notFound =  () =>{
    return{
        succsess: false,
        statusCode: 400,
        body: 'DEU ATÉ ERRO 404 NOT FOUND'
    
    }
}

export const serverError = (error) => {

    return{
        succsess: false,
        statusCode: 400,
        body: error
    
    }
}