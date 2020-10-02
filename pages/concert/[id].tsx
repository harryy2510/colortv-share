import { GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'
import getNewDate from '../../utils/getNewDate'

interface Props {
    concert: any
}

const DEVICE = 'web'

const Concert: React.FC<Props> = ({ concert }) => {
    const domain = process.env.NEXT_APP_APP_URL
    const title = concert?.name ?? ''
    const description = concert?.description ?? ''
    const image = concert?.cover?.url ?? ''
    const url = `${domain}/concert/${concert.id}`
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.location.href = url
        }
    }, [])
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:type" content="website" />
            {title && (
                <>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="twitter:title" content={title} />
                    <meta name="og:title" content={title} />
                </>
            )}
            {description && (
                <>
                    <meta name="description" content={description} />
                    <meta name="twitter:description" content={description} />
                    <meta name="og:description" content={description} />
                </>
            )}
            {image && (
                <>
                    <meta name="image" content={image} />
                    <meta name="twitter:image" content={image} />
                    <meta name="og:image" content={image} />
                </>
            )}
            {url && <meta name="og:url" content={url} />}
        </Head>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const baseApiUrl = process.env.NEXT_APP_API_URL
    const apiUrl = `${baseApiUrl}/api/v1/concerts/schedule/${params.id}`
    const data = await fetch(apiUrl, {
        headers: {
            Accept: '*/*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'x-app-platform': DEVICE,
            'cache-control': 'no-cache',
            'x-app-device': DEVICE,
            'x-app-date': getNewDate(),
        },
    }).then((res) => res.json())
    const concert = data ? data.concert_schedule : null
    return {
        props: {
            concert,
        },
    }
}

export default Concert
