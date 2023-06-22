
import prisma from "@/app/libs/prismadb";


export interface IListingsParams{
    userID?:string;
    guestCount?:number;
    roomCount?:number;
    bathroomCount?:number;
    startDate?:string;
    endDate?:string;
    locationValue?:string;
    category?:string;

}


export default async function getListings( params:IListingsParams){

     try{

const{userID,
roomCount,
guestCount,
bathroomCount,
locationValue,
startDate,
category,
endDate}=params;
let query:any = {};

if(userID){
    query.userID = userID;
}

if(category){
    query.category = category;
}

//gte==greater than or equal to
if(roomCount){
    query.roomCount = {
        gte:+roomCount
    }
}
if(guestCount){
    query.guestCount = {
        gte:+guestCount
    }
}
if(bathroomCount){
    query.bathroomCount = {
        gte:+bathroomCount
    }
}

if(locationValue){
    query.locationValue=locationValue;
}


// using these two combination we filter out all kinds of conflicts in reservation
if(startDate&& endDate){
    query.NOT = {
        reservations:{
            some:{
                OR:[
                {
                    endDate:{gte:startDate},
                    startDate:{lte:startDate},
                },
                {
                    startDate:{lte:endDate},
                    endDateL:{gte:startDate}
                }
            ]
            }
        }
    }
}



const listings = await prisma.listing.findMany({
    where:query,
    orderBy:{
        createdAt:'desc'
    }
});
return listings;
     }
     catch(error:any){
        console.log(error)
        throw new Error(error);
     }
}