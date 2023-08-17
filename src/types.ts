export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

interface Name {
    title: string
    first: string
    last: string
  }

interface Location {}

interface Login {}

interface Dob {}

interface Registered {}

interface Id {
  name: string;
  value: string;
}
interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
