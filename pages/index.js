import Head from 'next/head'
import { connectToDatabase } from '../lib/mongodb'

export default function Home({ isConnected }) {
  return (
    <div className="container">
      
    </div>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
