import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";

const  BookingsPage= async () => {
// Recuperar a sessao do usuario (ver se ele esta logado ou nao)
    const session = await getServerSession(authOptions)
//se ele nao estiver logado , redirecionar para a pagina de login ou pagina inicial.
    if (!session?.user) {
        redirect("/");
    }


    const [confirmedbookings, finishedbookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date(),
                }
            },
            include: {
              service: true, 
              barbershop: true, 
            }
        }),

        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date(),
                }
            },
            include: {
              service: true, 
              barbershop: true, 
            }
        }),
    ]);


    return (
        <>
            <Header />

            <div className="px-5 py-6">
                <h1 className="text-xl font-bold">Agendamentos</h1>

                {confirmedbookings.lenght === 0 && finishedbookings.lenght === 0 && (
                     <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Confirmados</h2>
                )}
               

                <div className="flex flex-col gap-3"> 
                   {confirmedbookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                    ))}
                </div>


                <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>

                    <div className="flex flex-col gap-3"> 
                    {finishedbookings.map((booking) => (
                        <BookingItem key={booking.id} booking={booking} />
                        ))}
                    </div>
                
            </div>
            
        </>
        );
}
 
export default BookingsPage;