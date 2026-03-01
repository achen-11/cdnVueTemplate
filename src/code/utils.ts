// 工具函数

// 成功响应
export function successResponse(data: any) {
    return { success: true, data }
}

// 错误响应
export function errorResponse(message: string, code?: number) {
    return { success: false, error: message, code }
}

// 分页响应
export function paginatedResponse(items: any[], page: number, pageSize: number, total: number) {
    return {
        success: true,
        data: {
            items,
            pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) }
        }
    }
}

// 验证必填字段
export function validateRequired(fields: Record<string, any>, required: string[]): string | null {
    for (const field of required) {
        if (!fields[field]) return `${field} is required`
    }
    return null
}

export default { successResponse, errorResponse, paginatedResponse, validateRequired }
