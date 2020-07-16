function cleanJSON(parent) {
    for (var child in parent) {
        if (typeof parent[child] === "object") {
            var result = cleanJSON(parent[child]);
            switch (result) {
                case "DeleteParent":
                    return "DeleteChild"
                case "DeleteChild":
                    delete parent[child];
                    break;
                default:
                    parent[child] = result;
            }
        }
        else {
            if (child === "size" && parent["size"] === 0) {
                return "DeleteChild";
            }
        }
    }
    if (Array.isArray(parent)) {
        var filtered = parent.filter((val) => { return val != null; })
        if (filtered['length'] === 0) {
            return "DeleteParent";
        }
        else {
            return filtered;
        }
    }
    return parent;
}