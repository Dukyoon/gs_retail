interface ContentHeaderProps {
    title: String,
    //필요시 추가
}

const ContentHeader = (props: ContentHeaderProps) => {
    return (
        <>
            <div className="content-header">
                <div className="box-tit">
                    <h2 className="fz-36 fc-1 fw-bold">{props.title}</h2>
                </div>
            </div>
        </>
    )
}

export default ContentHeader;