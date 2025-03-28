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
            const stories = await Story.find({ user: req.user.id})
            .sort({ createdAt: -1})
            .lean()

            let thisWeekNumber = new Date();

                let weeks = await Story.aggregate( 
                [
                {
                    $project: {
                        week: { $week: "$createdAt"},
                        thisWeek: { date: new Date() },
                        thisWeekNum: { $week: new Date()},
                        truncateThisWeek: {
                            $dateTrunc: {
                            date: "$createdAt", unit: "week", binSize: 1, 
                            timezone: "America/New_York", startOfWeek: "Monday" 
                            }
                        },
                        userID: "$user"
                        }
                    }
            ])

            let userEntries = weeks.filter((week) => week.userID == req.user.id)

        // This week's number of entries:
            var getThisWeekNum = function() {
                var count = 0;
                if (userEntries == []) {
                    return count;
                } else if (userEntries.length >= 1) {
                    var thisWeekNum = userEntries[0].thisWeekNum;
                    for (let i=0; i < userEntries.length; i++) {
                        if (userEntries[i].week == thisWeekNum) {
                            count++
                        }
                    }
                    return count;
                } else {
                    return count;
                } 
            }

        // Top Week's number of entries:
            var getTopWeekNum = function() {
                if (userEntries == []) {
                    return false;
                }
                var res = [];
                for (let item of userEntries) {
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
                        if (numMap[num] >= maxNumValue) {
                            maxNumValue = numMap[num]
                            maxNum = num
                        }
                    }

                    return maxNum
                }

        // get top week dates via its num:
            var getTopWeekDate = function() {
                var topWeekNum = getTopWeekNum()

                if (topWeekNum == false) {
                    return 'start adding entries to get top week'
                }

                var topWeekObject = userEntries.find(entry => entry.week == topWeekNum)

                // console.log(topWeekObject)

                return `week of ${topWeekObject.truncateThisWeek.toString().slice(4, 15)}`;
            }      
    
            res.render('dashboard', {
                name: req.user.firstName,
                stories,
                getThisWeekNum,
                getTopWeekDate,
            }) 
            
            
        } catch (error) {
            console.error(error)
            res.render('error/500')
        }   
    }
}