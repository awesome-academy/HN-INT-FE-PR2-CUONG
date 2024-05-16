const AreaView = ({title, children}) => {
    return(
        <div className="w-full h-[20rem] bg-white px-6 py-4
            rounded-2xl drop-shadow-2xl space-y-6">
                <h2 className="font-black text-xl">{title}</h2>
                {children}
        </div>
    )
}

export default AreaView
