import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingbyID from "@/app/actions/getListingbyID";
import getReservations from "@/app/actions/getreservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingID?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  console.log("Listing ID:", params.listingID);
  const listing = await getListingbyID({ listingID: params.listingID });
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
