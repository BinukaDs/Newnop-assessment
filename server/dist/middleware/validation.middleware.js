export const validate = (schema, target = "body") => (req, res, next) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.issues,
        });
    }
    req[target] = result.data;
    next();
};
//# sourceMappingURL=validation.middleware.js.map