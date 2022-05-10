import { useState } from 'react'
import { useUser } from '~/lib/UserProvider'

export default function Profile() {
  const { user, logout } = useUser()
  const [username, setUsername] = useState(null)
  // useEffect(() => {
  //   getProfile();
  // }, [session]);

  // async function getProfile() {
  //   try {
  //     const user = supabase.auth.user();
  //     let { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`username`)
  //       .eq('id', user.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUsername(data.username);
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  // async function updateProfile() {
  //   try {
  //     const user = supabase.auth.user();
  //     const updates = {
  //       id: user.id,
  //       username,
  //       updated_at: new Date(),
  //     };

  //     let { error } = await supabase.from('profiles').upsert(updates);
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  //}

  return (
    <div className="container mx-auto grid min-h-screen place-content-center">
      <p>Oh hi there {user?.email}</p>
      <input
        className="my-4 w-full rounded-xl border-2 border-gray-500 p-4"
        type="username"
        placeholder="Enter a username blaajspsd'pkdp"
        // value={username}
        // onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          //   updateProfile()
        }}
        className="mt-4 w-full rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
      >
        <span>Update profile</span>
      </button>
      <p className="mt-4 text-center">or</p>
      <button
        className="mt-4 rounded-lg border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-lg text-gray-100 focus:border-4"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}