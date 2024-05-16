import { useEffect, useState } from "react"
import HomeFollow from "../follow-us"
import HomeBanner from "../home-banner"
import HomePolicy from "../home-policy"
import HomeProduct from "../home-product"
import HomeSuggest from "../home-suggest"
import HomeTopProducts from "../home-top-products"

const HomeView = () => {

    const [lastSeenProduct, setLastSeenProduct] = useState(null)

    useEffect(() => {
        const lastSeenProduct = JSON.parse(localStorage.getItem('lastSeenProducts') || '[]')
        setLastSeenProduct(lastSeenProduct)
    },[])

    return(
        <>
            <HomeBanner/>
            <HomePolicy/>
            <HomeProduct/>
            <HomeTopProducts/>
            {lastSeenProduct?.length && <HomeSuggest listProductId={lastSeenProduct}/>}
            <HomeFollow/>
        </>
    )
}

export default HomeView
