interface ISharedConfig {
    tokens: {
        access: {
            name: string;
        };
        refresh: {
            name: string;
        };
        resetPassword: {
            name: string;
        };
    };
}

export const shared_config: ISharedConfig = {
    tokens: {
        access: {
            name: 'access_token',
        },
        refresh: {
            name: 'refresh_token',
        },
        resetPassword: {
            name: 'reset_password_token',
        },
    },
};
