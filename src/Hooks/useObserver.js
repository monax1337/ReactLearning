import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();
    useEffect(() => {
        if (isLoading) return; //елси isPostsLoading (наш div уже в поле видимости), то он возвращает нихуя  
        if (observer.current) observer.current.disconnect(); //если observer.current уже создан и в поле current что-то находится, то мы отключаем observer, который наблюдает в текущий момент
        const cb = (entries, observer) => {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        }
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current);
    }, [isLoading])
}