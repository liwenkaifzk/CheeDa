/**
 * Created by Wangchaoxiong on 17/2/11.
 */

/**
 * @enum
 */
var Action = {
    _domain: "@{GustFrame.server}",
    WinClientVersion: 'https://im.workinggo.com/app/windows/clientVersion.json',
    MacClientVersion: 'https://im.workinggo.com/app/mac/clientVersion.json',
    Login: '/auth/login',           //坐标登录
    QuickLogin: '/auth/login/qr',
    getFriendHashByType: '/v2/user/sign',     //好友hash
    getGroupHashByType: '/user/sign',        //群组hash
    QuickLoginKey: '/auth/login/qr/key',
    QuickLoginKeyStatus: '/auth/login/qr/status',
    CheckNickname: '/user/dn/check',
    Contacts: '/contacts',
    ContactsInfo: '/category/friends',                         //坐标检索分组下的好友列表
    getFriendsByIds: '/friend/batch_by_id',                      //坐标批量获取好友列表
    ContactsGroupList: '/category/list',                     //坐标获取坐标好友分组
    FriendsAll: '/v2/contacts/list',                            //坐标所有好友
    UserDeviceBatchById: '/user/device/batch_by_id',     //坐标好友的登录设备
    UserStateBatchById: '/user/condition/batch_by_id',   // 坐标获取好友在线状态
    getDeletFriendList: '/friend/delete/list',                  //获取被删除的好友列表
    CategoryInfo: '/category/info',                     //坐标分组详情
    CheckFriendUpdateTime: '/v2/contacts/timestamp/all',     //检查好友更新时间
    CheckFriendDeleteTime: '/v2/contacts/delete/list',     //检查好友更新时间
    CheckGroupUpdateTime: '/group/timestamp/all',       //检查群组更新时间
    ApplyTenantNum: '/application/number/no_read',     //坐标未处理的申请记录
    ApplyTenantHistory: '/v2/application/history',        //坐标申请添加记录
    AgreeAll: '/application/agree_all',                 //坐标同意所有申请记录
    DealTenant: '/v2/application/deal',               //坐标处理坐标申请记录<同意或拒绝>
    DelApply: '/v2/application/delete',                 //坐标删除验证信息
    ClearApply: '/application/clear',                   //坐标清除所有验证信息
    TenantLs: '/user/search/by_key',        //坐标模糊搜索用户
    PhoneList: '/contacts/batch/info',       //坐标通讯录联系人
    NewContact: '/v2/contacts/new',         //坐标添加联系人
    GetContactByKey: '/v2/contacts/get/by_key',         //坐标根据电话邮箱获取联系人
    UpdatePhoneRemark: '/contacts/remark',      //坐标设置手机联系人备注
    PhoneInfoBatch: '/contacts/batch_by_id',     //坐标通过Ids获取通讯录联系人信息
    DelPhoneById: '/contacts/delete',            //坐标通过id删除通讯录联系人
    ContactsAll: '/v2/contacts/list',            //坐标获取全部联系人
    DelTenantById: '/v2/contacts/delete',            //坐标通过id删除好友
    UpdateContactInfo: '/v2/contacts/update',             //坐标更新联系人信息
    UpdateContact: '/v2/contacts/update',       //坐标联系人更新
    UpdateRemark: '/friend/remark',             //坐标更新好友备注名
    UpdateCategory: '/category/move',           //坐标变更好友分组
    CreateCategory: '/category/create',         //坐标创建好友分组
    RenameCategory: '/category/rename',         //坐标重命名分组
    DeletCategory: '/category/delete',          //坐标删除好友分组
    GroupMembersById: '/group/member/list',     //坐标获取群组内的成员
    UpdateGroupNotice: '/group/notice/update',     //坐标更新群公告
    UpdateGroupInfo: '/group/info/update',          //坐标更新群内容
    UpdateGroupNotifi: '/group/mute_notifications/update',  //坐标更新群组消息通知
    UpdateGroupAlias: '/group/alias/update',         //坐标修改群昵称
    UpdateGroupFace: '/group/face/update',          //坐标群组头像修改
    AddGroupMembers: '/application/group_add_members',          //坐标添加群成员
    AddGroupManages: '/group/manager/new',          //坐标添加群管理员
    DelGroupManages: '/group/manager/delete',       //坐标删除群管理员
    GroupRemMembers: '/group/member/delete',        //坐标删除群成员
    GroupMemberByCube: '/group/member/by_cube',        //通过cube获取群成员的信息
    GroupForward: '/group/transfer',                //坐标群组转让
    GroupExit: '/group/quit',                       //坐标退出群组
    GroupShareQr: '/group/qr/share',                //坐标群组二维码分享
    ShareQr: '/user/qr/share',                //坐标二维码分享
    Tenant: '/friend/query',                        //坐标通过id获取好友信息
    getUserByCube: '/v2/contacts/get/by_cube',         //坐标通过cube获取用户信息
    getUserById: '/v2/contacts/get/by_id',             //坐标通过id获取用户信息
    getUserByCubes: '/v2/contacts/get/batch_by_cube',      //坐标通过cubes获取用户信息
    getUserByIds: '/v2/contacts/get/batch_by_id',             //坐标通过ids获取用户信息
    GroupCreate: '/group/create',                 //坐标创建群组
    GroupList: '/group/list',                   //坐标群组列表
    GroupInfo: '/group/get',                    //坐标通过id或者cube获取群组详情
    getGroupsByCubes: '/group/info/by_cubes',      //坐标通过cubes获取群组详情
    getGroupsByIds: '/group/info/by_ids',           //坐标通过ids获取群组详情
    GroupDelete: '/group/delete',               //坐标删除群组
    ApplyContact: "/v2/application/new",           //坐标添加好友
    UserInfoUpdate: "/user/info/update",
    UserFaceUpdate: "/user/face/update",
    Logout: '/auth/logout',                     //坐标退出
    RefreshToken: '/auth/login/token',
    PhoneRegister: "/auth/register/mobile",
    MailRegister: '/auth/register/email',
    findInvitationStatus: '/contacts/invitation/status',
    sendInvitation: '/contacts/invitation',
    SendVerfication: '/auth/register/verification',        //坐标注册发送手机验证码
    SendGetVerfication:'/auth/verification/get',           //坐标发送手机登录验证码
    GetVerficationTime:'/auth/verification/ttl',           //坐标返回手机登录验证码可用时间
    PhoneLogin:'/auth/verification/login',                  //坐标手机登录
    SendCodeSet:'/send_mobile',                              //坐标手机设置密码时发送验证码
    CheckSetCode:'/check',                                    //坐标手机设置密码时验证验证码
    SetPwd:'/auth/set/pwd',                                   //坐标手机验证码登录设置密码

    Update_pwd: '/auth/update_pwd',                   //修改密码
    CheckPwd: '/auth/check_pwd',                         //验证旧密码
    CheckMobile: '/user/info/by_mobile',
    CheckSummaryMobile: '/user/summary/by_mobile',
    CheckSummaryEmail: '/user/summary/by_email',
    BindVerification: '/auth/binding/verification',        //发送验证码
    BindMobile: '/auth/binding/mobile',                    //绑定手机
    BindEmail: '/auth/binding/email',                     //绑定邮箱
    FixBindEmail: '/auth/fix_binding/email',              //更改绑定邮箱
    UnbindEmail: '/auth/unbinding/email',                //解绑邮箱
    UnbindMobile: '/auth/unbinding/mobile',              //解绑手机
    OldMobileCheck: '/auth/binding/mobile/check',      //验证原来手机
    NewFeedback: '/feedback/new_feedback',           //意见反馈
    CheckAccount: '/auth/reset/check_account',          //检索账号是否存在
    SendCodeByReset: '/auth/reset/send_mobile',         //发送验证码
    CheckMobileCode: '/auth/reset/check',               // 检验找回密码验证码
    ResetMobile: '/auth/reset/mobile',               //通过手机号找回密码
    ResetEmail: '/auth/reset/send_email',                      //通过邮箱找回密码
    GroupMember: '/group/member/by_id',
    onLineList: '/user/online/list',                 //在线终端列表

    MailboxAccountNew: "/mailbox/account/new",
    CheckMailboxUpdateTime: "/mailbox/timestamp",      //检索邮箱账号是否有变更
    MailboxAccountList: "/mailbox/account/list",    //  查询邮箱账号列表
    MailboxDeleteAccount: "/mailbox/account/del",   //   删号邮箱账号
    MailboxUpdateAccount: "/mailbox/account/update",  //   删号邮箱账号
    MailstartAutograph:"/mailbox/account/update",     //启动签名

    getMailboxByEmail: "/mailbox/info/by_email",        //根据邮箱账号获取详情
    getMailboxById: "/mailbox/info/by_id",              //根据邮箱id获取详情

    //ScheduleLayer
    ScheduleCreate: "/schedule/new",     // 新建日程
    ScheduleDel: "/schedule/delete",         // 删除日程
    ScheduleSearch: "/schedule/search",     // 搜索日程
    ScheduleMark: "/schedule/status/mark",   // 日程标记
    ScheduleList: "/schedule/info/list",    //根据指定时间段，分页获取日程列表
    ScheduleById: "/schedule/info/by_id",    //通过id查询详情
    ScheduleByIds: "/schedule/info/batch_by_id",    //通过id批量获取
    ScheduleUpdate: "/schedule/update",    //日程更新,
    CheckScheduleUpdateTime: "/schedule/timestamp/list",    //获取指定时间段所有日程的id和更新时间戳
    ScheduleShare: "/schedule/url/get",            //分享日程（获得URL）
    AppDownLoadQr:"/system/qr/download/url",    // app下载的二维码

    // 聚合页
    newsInfoById: "/news/info/by_id",
    newSummaryList: "/news/summary/list",
    newsWeatherInfo: "/weather/info/by_area",
    //更新用户工作状态
    newsCondition: "/user/condition/update",
    ContactInvite: "/v2/contacts/invitation",
    //刷新用户设备信息
    AuthTokenRefresh: "/auth/token/refresh"

};