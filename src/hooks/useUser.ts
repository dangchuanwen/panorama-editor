import { useEffect, useState } from 'react';
import { getUserInformation, User } from 'requests/requests';
let localUser: User | undefined = undefined;
const useUser: () => User | undefined = () => {
  const [user, setUser] = useState<User | undefined>(localUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserInformation();
        if (res && res.data) {
          setUser(res.data);
          localUser = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (!localUser) {
      fetchUser();
    }
  }, []);
  return user;
};

export default useUser;
