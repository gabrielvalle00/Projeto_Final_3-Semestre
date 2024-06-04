class Login {

    constructor(login,senha,status,idP,idPE){
        this.id = (id !== null || id > 0) ? pTel.id : null;
        this.login = login;
        this.senha = senha;
        this.status = status;
    }
    get getId () {
        return this.id;
    }
    getLogin(){
        return this.login;
    }
    getSenha(){
        return this.senha;
    }
    getStatus(){
        return this.status;
    }
    setLogin(login){
        this.login = login;
    }
    setSenha(senha){
        this.senha = senha;
    }
    setStatus(status){
        this.status = status;
    }
}

module.exports = Login