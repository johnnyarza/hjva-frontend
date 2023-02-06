class Setting {
  constructor(
    setting = {
      id: '',
      name: '',
      value: '',
      createdAt: '',
      updatedAt: '',
      file: '',
    }
  ) {
    const { id, name, value, createdAt, updatedAt, file } = setting;
    this.id = id;
    this.name = name;
    this.value = value;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.file = file;
  }
}

export default Setting;
