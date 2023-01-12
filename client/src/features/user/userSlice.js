import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadUser, addUser, removeUser, updateUser } from './userAPI';

import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: { 'Authorization': 'token' }
});

const initialState = {
    value: {
        data: [],
        params: {
            page: 1,
            totalPage: 0
        }
    },
    status: 'idle',
};

export const loadUserAsync = createAsyncThunk(
    'user/loadUser',
    async () => {
        const response = await loadUser();
        return { data: response.data.data.result, page: response.data.data.page, totalPage: response.data.data.totalPage };
    }
);

export const addUserAsync = createAsyncThunk(
    'user/addUser',
    async ({ id, name, phone }) => {
        try {
            const response = await addUser(name, phone);
            return { success: true, id, data: response.data.data }
        } catch (error) {
            return { success: false, id }
        }
    }
);

export const removeUserAsync = createAsyncThunk(
    'user/removeUser',
    async (id) => {
        const response = await removeUser(id);
        return { id, data: response.data.data }
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async ({ id, name, phone }) => {
        const response = await updateUser(id, name, phone);
        return { id, data: response.data.data }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value = {
                ...state.value,
                data: [
                    ...state.value.data,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        phone: action.payload.phone,
                        sent: true
                    }
                ]
            }

        },
        loadMore: (state, action) => {
            state.value = {
                data: [...state.value.data, ...action.payload.value.map(item => {
                    item.sent = true
                    return item
                })],
                params: action.payload.params
            }
        },
        searchUser: (state, action) => {
            state.value = {
                data: action.payload.value.map(item => {
                    item.sent = true
                    return item
                }),
                params: action.payload.params
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = {
                    data: action.payload.data.map(item => {
                        item.sent = true
                        return item
                    }),
                    params: {
                        page: action.payload.page,
                        totalPage: action.payload.totalPage
                    }
                }
            })
            .addCase(addUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.success) {
                    state.value = {
                        ...state.value,
                        data: [...state.value.data.map(item => {

                            if (item.id === action.payload.id) {
                                return {
                                    id: action.payload.data.id,
                                    name: action.payload.data.name,
                                    phone: action.payload.data.phone,
                                    sent: true
                                }
                            }
                            return item
                        })]
                    };

                } else {
                    state.value = {
                        ...state.value,
                        data: [...state.value.data.map(item => {
                            if (item.id === action.payload.id) {
                                return {
                                    ...item,
                                    sent: false
                                }
                            }
                            return item
                        })]
                    }
                }
            })
            .addCase(removeUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = {
                    ...state.value,
                    data: [...state.value.data.filter(item => item.id !== action.payload.id)]
                }
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = {
                    ...state.value,
                    data: [...state.value.data.map(item => {
                        if (item.id === action.payload.id) {
                            return {
                                id: action.payload.data.id,
                                name: action.payload.data.name,
                                phone: action.payload.data.phone,
                                sent: true
                            }
                        }
                        return item
                    })]
                }
            })
    },
});

export const { add, loadMore, searchUser } = userSlice.actions;

export const selectUser = (state) => state.user.value.data;

export const create = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
    if (!dispatch(search())) {
        dispatch(add({ id, name, phone }))
        dispatch(addUserAsync({ id, name, phone }))
    }
};

export const loadPagination = () => (dispatch, getState) => {
    let state = getState()
    if (state.user.value.params.page < state.user.value.params.totalPage) {
        let params = {
            ...state.user.value.params,
            page: state.user.value.params.page + 1
        }
        request.get('api/phonebooks', { params: params }).then(({ data }) => {
            params = {
                ...params,
                totalPage: data.data.totalPage
            }
            dispatch(loadMore({ value: data.data.result, params }))
        })

    }
};


export const search = (query) => (dispatch, getState) => {
    let state = getState()

    let params = {
        ...state.user.value.params,
        ...query,
        page: 1
    }
    request.get('api/phonebooks', { params: params }).then(({ data }) => {
        params = {
            ...params,
            totalPage: data.data.totalPage
        }
        dispatch(searchUser({ value: data.data.result, params }))
    })

};

export default userSlice.reducer;
