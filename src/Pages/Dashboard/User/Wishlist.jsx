import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import WishlistCard from './WishlistCard';
import useAuth from '../../Hooks/useAuth';

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
    return (
        <div>
            {
                wishlist.map(property => <WishlistCard
                key={property._id}
                property={property}
                refetch={refetch}>

                </WishlistCard>)
            }
            
        </div>
    );
};

export default Wishlist;

