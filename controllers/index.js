const Story = require('../models/Story')

module.exports = {

// @desc Login/landing page
// @route GET /
    getLogin: (req, res) => {
        res.render('login', {
            layout: 'login',
        })
    },


// @desc Dashboard
// @route GET /dashboard
    getDashboard: async (req, res) => {
        try {
            const stories = await Story.find({ user: req.user.id }).lean()

            let weeks = await Story.aggregate( 
                [
                {
// https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/dateTrunc/
                    $project: {
                        week: { $week: "$createdAt"},
                        thisWeek: { date: new Date() },
                        thisWeekNum: { $week: new Date()},
                        truncateThisWeek: {
                            $dateTrunc: {
                            date: "$createdAt", unit: "week", binSize: 1, 
                            timezone: "America/New_York", startOfWeek: "Monday" 
                            }
                        }
                        }
                    }
            ])

        // This week's number of entries:  FIX HOW TO GRAB THIS WEEK!
            var count = 0;
            // var topWeekNum = getTopWeekNum()

            //     var topWeekObject = weeks.find(week => week.week == topWeekNum)

            //     return topWeekObject.truncateThisWeek.toString().slice(4, 15);

            var thisWeek = weeks[0].week
            var getThisWeekNum = function() {
                for (let i=0; i < weeks.length; i++) {
                    if (weeks[i].week == thisWeek) {
                        count++
                    }
                }
                return count;
            }

        // Top Week's number of entries:
            var getTopWeekNum = function() {
                var res = [];
                for (let item of weeks) {
                    res.push(item.week)
                }
            
                var numMap = {};

                for (let num of res) {
                    if (numMap.hasOwnProperty(num)) {
                        numMap[num] ++
                    } else {
                        numMap[num] = 1
                    }
                }

                    var maxNumValue = 0
                    var maxNum = ''

                    for (let num in numMap) {
                        if (numMap[num] > maxNumValue) {
                            maxNumValue = numMap[num]
                            maxNum = num
                        }
                    }

                    return maxNum;
                }

        // get top week dates via its num:
            var getTopWeekDate = function() {
                var topWeekNum = getTopWeekNum()

                var topWeekObject = weeks.find(week => week.week == topWeekNum)

                return topWeekObject.truncateThisWeek.toString().slice(4, 15);
            }

        // // This week's number of entries:
        //     var count = 0;
        //     let thisWeek = weeks[0].thisWeekNum
        //     let getThisWeekNum = function() {
        //         for (let i=0; i < weeks.length; i++) {
        //             if (weeks[i].week == thisWeek) {
        //                 count++
        //             }
        //         }
        //         return count;
        //     }

        // // Top Week's number of entries:
        //     let getTopWeekNum = function() {
        //         let res = [];
        //         for (let item of weeks) {
        //             res.push(item.week)
        //         }
               
        //         let numMap = {};
    
        //         for (let num of res) {
        //             if (numMap.hasOwnProperty(num)) {
        //                 numMap[num] ++
        //             } else {
        //                 numMap[num] = 1
        //             }
        //         }

        //             let maxNumValue = 0
        //             let maxNum = ''

        //             for (let num in numMap) {
        //                 if (numMap[num] > maxNumValue) {
        //                     maxNumValue = numMap[num]
        //                     maxNum = num
        //                 }
        //             }

        //             return maxNum;
        //         }

        // // get top week dates via its num:
        //     let getTopWeekDate = function() {
        //         let topWeekNum = getTopWeekNum()

        //         let topWeekObject = weeks.find(week => week.week == topWeekNum)

        //         return topWeekObject.truncateThisWeek.toString().slice(4, 15);
        //     }
       
    
            res.render('dashboard', {
                name: req.user.firstName,
                stories,
                getThisWeekNum,
                getTopWeekDate,
            })

            console.log(getTopWeekNum())
            console.log(getTopWeekDate())
            console.log(weeks)
            
        } catch (error) {
            console.error(error)
            res.render('error/500')
        }   
    }
}