var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ResumeGenerator = /** @class */ (function () {
    function ResumeGenerator() {
        this.initializeEventListeners();
    }
    ResumeGenerator.prototype.initializeEventListeners = function () {
        var _this = this;
        var generateBtn = document.querySelector('.generate-btn');
        var shareBtn = document.querySelector('.share-btn');
        var downloadBtn = document.querySelector('.download-btn');
        var addEducationBtn = document.querySelector('.add-btn[onclick="addEducation()"]');
        var addExperienceBtn = document.querySelector('.add-btn[onclick="addExperience()"]');
        if (addEducationBtn) {
            addEducationBtn.removeAttribute('onclick');
            addEducationBtn.addEventListener('click', function () { return _this.addEducation(); });
        }
        if (addExperienceBtn) {
            addExperienceBtn.removeAttribute('onclick');
            addExperienceBtn.addEventListener('click', function () { return _this.addExperience(); });
        }
        if (generateBtn) {
            generateBtn.addEventListener('click', function () { return _this.generateResume(); });
        }
        if (shareBtn) {
            shareBtn.addEventListener('click', function () { return _this.shareResume(); });
        }
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function () { return _this.downloadResume(); });
        }
    };
    ResumeGenerator.prototype.addEducation = function () {
        var container = document.getElementById('educationEntries');
        if (!container || !container.children.length)
            return;
        var newEntry = container.children[0].cloneNode(true);
        newEntry.querySelectorAll('input').forEach(function (input) {
            input.value = '';
        });
        container.appendChild(newEntry);
    };
    ResumeGenerator.prototype.addExperience = function () {
        var container = document.getElementById('experienceEntries');
        if (!container || !container.children.length)
            return;
        var newEntry = container.children[0].cloneNode(true);
        newEntry.querySelectorAll('input, textarea').forEach(function (input) {
            input.value = '';
        });
        container.appendChild(newEntry);
    };
    ResumeGenerator.prototype.generateResume = function () {
        this.updatePersonalInfo();
        this.updateEducation();
        this.updateExperience();
        this.generateUniqueUrl();
        var resumeOutput = document.getElementById('resumeOutput');
        if (resumeOutput) {
            resumeOutput.style.display = 'block';
            resumeOutput.scrollIntoView({ behavior: 'smooth' });
        }
    };
    ResumeGenerator.prototype.updatePersonalInfo = function () {
        var _a, _b, _c, _d, _e;
        var name = (_a = document.getElementById('fullName')) === null || _a === void 0 ? void 0 : _a.value;
        var title = (_b = document.getElementById('title')) === null || _b === void 0 ? void 0 : _b.value;
        var email = (_c = document.getElementById('email')) === null || _c === void 0 ? void 0 : _c.value;
        var phone = (_d = document.getElementById('phone')) === null || _d === void 0 ? void 0 : _d.value;
        var summary = (_e = document.getElementById('summary')) === null || _e === void 0 ? void 0 : _e.value;
        if (name)
            document.getElementById('outputName').textContent = name;
        if (title)
            document.getElementById('outputTitle').textContent = title;
        if (email && phone)
            document.getElementById('outputContact').textContent = "".concat(email, " | ").concat(phone);
        if (summary)
            document.getElementById('outputSummary').textContent = summary;
    };
    ResumeGenerator.prototype.updateEducation = function () {
        var educationEntries = document.getElementsByClassName('education-entry');
        var outputEducation = document.getElementById('outputEducation');
        if (!outputEducation)
            return;
        var educationHTML = '';
        Array.from(educationEntries).forEach(function (entry) {
            var _a, _b, _c;
            var degree = (_a = entry.querySelector('.education-degree')) === null || _a === void 0 ? void 0 : _a.value;
            var institution = (_b = entry.querySelector('.education-institution')) === null || _b === void 0 ? void 0 : _b.value;
            var year = (_c = entry.querySelector('.education-year')) === null || _c === void 0 ? void 0 : _c.value;
            if (degree && institution && year) {
                educationHTML += "\n                    <div class=\"entry\">\n                        <h4>".concat(degree, "</h4>\n                        <p>").concat(institution, "</p>\n                        <p>").concat(year, "</p>\n                    </div>\n                ");
            }
        });
        outputEducation.innerHTML = educationHTML;
    };
    ResumeGenerator.prototype.updateExperience = function () {
        var experienceEntries = document.getElementsByClassName('experience-entry');
        var outputExperience = document.getElementById('outputExperience');
        if (!outputExperience)
            return;
        var experienceHTML = '';
        Array.from(experienceEntries).forEach(function (entry) {
            var _a, _b, _c, _d;
            var position = (_a = entry.querySelector('.experience-position')) === null || _a === void 0 ? void 0 : _a.value;
            var company = (_b = entry.querySelector('.experience-company')) === null || _b === void 0 ? void 0 : _b.value;
            var duration = (_c = entry.querySelector('.experience-duration')) === null || _c === void 0 ? void 0 : _c.value;
            var description = (_d = entry.querySelector('.experience-description')) === null || _d === void 0 ? void 0 : _d.value;
            if (position && company && duration && description) {
                experienceHTML += "\n                    <div class=\"entry\">\n                        <h4>".concat(position, "</h4>\n                        <p><strong>").concat(company, "</strong> | ").concat(duration, "</p>\n                        <p>").concat(description, "</p>\n                    </div>\n                ");
            }
        });
        outputExperience.innerHTML = experienceHTML;
    };
    ResumeGenerator.prototype.generateUniqueUrl = function () {
        var _a;
        var fullName = (_a = document.getElementById('fullName')) === null || _a === void 0 ? void 0 : _a.value;
        var resumeUrlElement = document.getElementById('resumeUrl');
        if (fullName && resumeUrlElement) {
            var username = fullName.toLowerCase().replace(/\s+/g, '-');
            var resumeUrl = "".concat(window.location.origin, "/").concat(username, "/resume");
            resumeUrlElement.textContent = resumeUrl;
        }
    };
    ResumeGenerator.prototype.shareResume = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resumeUrlElement, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resumeUrlElement = document.getElementById('resumeUrl');
                        if (!(resumeUrlElement === null || resumeUrlElement === void 0 ? void 0 : resumeUrlElement.textContent))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, navigator.clipboard.writeText(resumeUrlElement.textContent)];
                    case 2:
                        _a.sent();
                        this.showSuccessMessage();
                        if (!navigator.share) return [3 /*break*/, 4];
                        return [4 /*yield*/, navigator.share({
                                title: 'My Resume',
                                text: 'Check out my resume!',
                                url: resumeUrlElement.textContent
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.error('Error sharing resume:', error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ResumeGenerator.prototype.showSuccessMessage = function () {
        var successMessage = document.getElementById('copySuccess');
        if (!successMessage)
            return;
        successMessage.style.display = 'block';
        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 2000);
    };
    ResumeGenerator.prototype.downloadResume = function () {
        var element = document.getElementById('resumeOutput');
        if (!element)
            return;
        var opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };
    return ResumeGenerator;
}());
document.addEventListener('DOMContentLoaded', function () {
    new ResumeGenerator();
});
