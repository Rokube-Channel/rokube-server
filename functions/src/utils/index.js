const videoListFormat = (list) => {
    return list.reduce((acc, current) => {
        if (current.type.toLowerCase() == "video") {
            const duration = current.duration?.text ?? ""
            return [
                ...acc,
                {
                    id: current.id ?? '',
                    title: current.title?.text ?? '',
                    thumbnails: current.thumbnails[0]?.url ?? current.rich_thumbnail[0]?.url ?? '',
                    author_id: current.author?.id ?? '',
                    author_name: current.author?.name ?? '',
                    published: current.published?.text ?? '',
                    short_view_count: current.short_view_count?.text ?? current.view_count?.text ?? '',
                    duration: duration=="N/A"? "LIVE": duration
                }
            ]
        }
        return acc
    }, [])
}

module.exports = { videoListFormat }