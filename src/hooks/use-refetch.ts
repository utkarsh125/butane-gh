import { QueryClient, useQueryClient } from '@tanstack/react-query'

import React from 'react'

const useRefetch = () => {

    const QueryClient = useQueryClient()

    return async() => {
        await QueryClient.refetchQueries({
            type: 'active'
        })
    }
}

export default useRefetch