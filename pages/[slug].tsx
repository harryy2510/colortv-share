import { GetServerSideProps } from 'next'
import React from 'react'
import Head from 'next/head'

interface Props {
    params: {
        slug: string
    }
}

const metaKeys = ['title', 'description', 'image']
const facebookKeys = [...metaKeys, 'url']
const twitterKeys = [...facebookKeys, 'site']

const decode = (str: string) => {
    let res: Record<string, string> = {}
    try {
        if (str) {
            res = JSON.parse(window.atob(str))
        }
    } catch (e) {
        try {
            if (str) {
                res = JSON.parse(Buffer.from(str, 'base64').toString())
            }
        } catch (e) {}
    }
    return res
}

const Home: React.FC<Props> = ({ params: { slug } }) => {
    const query = decode(slug)
    const keys = Object.keys(query)
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                {query.title && <title>{query.title}</title>}
                {keys
                    .filter((key) => metaKeys.includes(key))
                    .map((key) => (
                        <meta key={key} name={key} content={query[key]} />
                    ))}
                <meta name="twitter:card" content="summary_large_image" />
                {keys
                    .filter((key) => twitterKeys.includes(key))
                    .map((key) => (
                        <meta key={key} name={`twitter:${key}`} content={query[key]} />
                    ))}
                <meta property="og:type" content="website" />
                {keys
                    .filter((key) => facebookKeys.includes(key))
                    .map((key) => (
                        <meta key={key} name={`og:${key}`} content={query[key]} />
                    ))}
            </Head>
            {query.url && <iframe src={query.url} frameBorder={0} />}
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => ({ props: { params } })

export default Home
