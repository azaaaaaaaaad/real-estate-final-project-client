import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import WishlistCard from './WishlistCard';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Wishlist = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { data: wishlist = [] , refetch} = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist?email=${user?.email}`)
            return res.data
        }
    })
    console.log(wishlist);


    const handleDelete = id => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/wishlist/${id}`)
              .then(res => {
                if (res.data.deletedCount > 0) {
                  refetch()
                  Swal.fire({
                    title: "Removed!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                }
              })
          }
        });
      }

    return (
        <div>
            {
                wishlist.map(property => <WishlistCard
                key={property._id}
                property={property}
                refetch={refetch}
                handleDelete={handleDelete}
                >
                </WishlistCard>)
            }
            
        </div>
    );
};

export default Wishlist;

