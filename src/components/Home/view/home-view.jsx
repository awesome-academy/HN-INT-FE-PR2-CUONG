import HomeFollow from "../follow-us"
import HomeBanner from "../home-banner"
import HomePolicy from "../home-policy"
import HomeProduct from "../home-product"
import HomeSuggest from "../home-suggest"
import HomeTopProducts from "../home-top-products"

const HomeView = () => {
    return(
        <>
            <HomeBanner/>
            <HomePolicy/>
            <HomeProduct/>
            <HomeTopProducts/>
            <HomeSuggest/>
            <HomeFollow/>
        </>
    )
}

export default HomeView
