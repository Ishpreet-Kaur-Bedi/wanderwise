'use client';
import { useRouter } from "next/navigation";

import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeUser, SafeListing} from "../types"
import {useCallback, useState} from "react"
import axios from "axios";
import { toast } from "react-hot-toast";
import { error } from "console";
import LisitngCard from "../components/listings/LisitingCard";
interface PropertiesClientProps{
reservations: SafeListing[];
currentUser?: SafeUser|null;

}



const TripsClient:React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
  const router = useRouter();
  const [deletingID,setDeletingID] = useState('')

  const onCancel = useCallback((id:string)=>{
setDeletingID(id);


axios.delete(`/api/listings/${id}`)

.then(()=>{
toast.success('Listings deleted');
router.refresh();

})

.catch((error)=>{
  toast.error(error?.response?.data?.error);
})

.finally(()=>{
  setDeletingID(' ');
})

  },[router])
  return (
  <Container>
    <Heading
    title="Properties"
    subtitle="List of your properties "
    />

    <div className="mt-10
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    ">
      {listings.map((listing)=>(
        <LisitngCard
        key={listing.id}
        data={listing}
        actionId={listing.id}
        onAction = {onCancel}
        disabled={deletingID===listing.id}
        actionLabel=" Delete Property"
        currentUser={currentUser}
        />
      ))}



    </div>
    </Container>
  )
}

export default TripsClient;
