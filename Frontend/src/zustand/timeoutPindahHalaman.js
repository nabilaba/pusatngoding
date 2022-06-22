import create from "zustand"

const useTimeoutGlobal = create(set => ({
    timeout: 1500,
}))

export default useTimeoutGlobal
