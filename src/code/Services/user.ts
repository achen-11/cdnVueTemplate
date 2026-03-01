import { userModel } from 'code/Models/user'
/**
 * 获取用户信息（自动注册）
 * 
 */
export const getUserInfo = (username: string) => {
    let userInfo = userModel.findOne({ user_id: username })
    if (userInfo) return userInfo

    // 未注册
    const { fullName, userName, isAdmin } = k.account.user.get(username)

    userModel.create({
        user_id: userName,
        name: fullName || userName,
        is_admin: isAdmin,
        email: k.account.user.current.email,
    })

    return {
        user_id: userName,
        name: fullName || userName,
        is_admin: isAdmin,
        email: k.account.user.current.email,
    }
}