export default class UserInfo {
    constructor({ name, job }) {
      this._name = name;
      this._job = job
    }
    
    getUserInfo() {
        const userData = {
          name: this._name.textContent,
          job: this._job.textContent
        };
        return userData;
      }
  
    setUserInfo(data) {
      this._name.textContent = data.name;
      this._job.textContent = data.job;
    }
}