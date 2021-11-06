export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }
    
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    };
      return userData;
    }
  
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
