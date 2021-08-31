import { useEffect, useState } from 'react';
import { getUserInformation, User } from 'requests/requests';

const useUser: () => User | undefined = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserInformation();
        if (res && res.data) {
          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);
  return user;
};

export default useUser;
