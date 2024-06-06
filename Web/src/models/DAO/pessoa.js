class Pessoa {
    constructor(pid, Nome, cpf, dataNasc, Email, Genero) {
        this.id = pid !== null && pid > 0 ? pid : null;
        this.nome = Nome;
        this.cpf = cpf;
        this.dataNasc = this.DataConvert(dataNasc);
        this.email = Email;
        this.genero = Genero;
    }

    get getId() {
        return this.id;
    }

    get getNome() {
        return this.nome;
    }

    get getCpf() {
        return this.cpf;
    }

    get getDataNasc() {
        return this.dataNasc;
    }

    get getEmail() {
        return this.email;
    }

    get getGenero() {
        return this.genero;
    }

    set newName(Nome) {
        this.nome = Nome;
    }

    set newCpf(cpf) {
        this.cpf = cpf;
    }

    set newDataNasc(newBirthdate) {
        this.dataNasc = this.DataConvert(newBirthdate);
    }

    set newEmail(email) {
        this.email = email;
    }

    set newGenero(genero) {
        this.genero = genero;
    }

    DataConvert(value) {
        if (value.includes('/')) {
            let [dia, mes, ano] = value.split('/');
            return `${ano}-${mes}-${dia}`;
        }
        return value; // Assuming value is already in YYYY-MM-DD format
    }
}

module.exports = Pessoa;
