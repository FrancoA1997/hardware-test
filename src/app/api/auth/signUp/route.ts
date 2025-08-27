
/* ------------------------------Imports---------------------------- */
//Props
import bcrypt from 'bcrypt'
import prisma from 'lib/connect'

//NextJs
import { getAuthSession } from 'lib/auth';
import { NextResponse } from 'next/server';
/*---------------------------------------------------------------------- */

   export const POST = async (req: Request) =>  {
      // const session = await getAuthSession();

      // if (!session) {
      //   return new NextResponse(
      //     JSON.stringify({ message: "Not Authenticated!" })
      //     ,
      //     { status: 401 }
      //   );
      // } 
    const body = await req.json();
    const {email, password} = body;


    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
        return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return Response.json(user, { status: 200 });

 
}