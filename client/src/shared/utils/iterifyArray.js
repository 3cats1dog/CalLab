
export function iterifyArray(arr, curr) {
        var cur = curr;
        arr.next = (function () { return (++cur >= this.length) ? false : this[cur]; });
        arr.prev = (function () { return (--cur < 0) ? false : this[cur]; });
        return arr;
}